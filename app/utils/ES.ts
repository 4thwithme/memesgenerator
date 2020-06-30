import { Client } from "@elastic/elasticsearch";

import { IMem, StringObject } from "app/types";

export const ES_INDEX = "memes-test";
export const ES_TYPE = "memes";

const client = new Client({
  node: "http://localhost:9200"
});

export default {
  //just for indexing existing memes
  addMemesToIndexBulk: async (memesArr: IMem[]) => {
    const { body } = await client.bulk({
      body: memesArr.flatMap((doc) => [
        { index: { _index: ES_INDEX, _type: ES_TYPE, _id: doc.id } },
        {
          tags: doc.tags,
          name: doc.name,
          memSrc: doc.memSrc,
          author: doc.author || { _id: null, username: null }
        }
      ])
    });

    if (body.errors) {
      const erroredDocuments: any[] = [];
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      body.items.forEach((action: any, i: number) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          });
        }
      });
      console.log(erroredDocuments);
    }

    const { body: count } = await client.count({ index: ES_INDEX, type: ES_TYPE });

    console.log("count", count);
  },
  //add meme to ES before save to DB
  addMemeToES: async (mem: IMem, authorObj: StringObject | null) => {
    await client.index({
      index: ES_INDEX,
      type: ES_TYPE,
      id: mem.id,
      body: {
        tags: mem.tags,
        name: mem.name,
        memSrc: mem.memSrc,
        author: authorObj || { _id: null, username: null }
      }
    });
  },
  // ES search
  searhMemes: async (query: string, limit: number = 10, offset: number = 0) => {
    const { body } = await client.search({
      index: ES_INDEX,
      type: ES_TYPE,
      body: {
        query: {
          multi_match: {
            query,
            fields: ["name", "tags"]
          }
        },
        from: offset,
        size: offset + limit,
        sort: [],
        aggs: {}
      }
    });

    return body.hits.hits;
  }
};
