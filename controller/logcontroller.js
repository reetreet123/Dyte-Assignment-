const elasticsearch = require("elasticsearch");
// Create an Elasticsearch client
const client = new elasticsearch.Client({
  host: "http://localhost:9200", // Elasticsearch server address
  log: "trace", // log level
});

// Function to index multiple logs
async function indexLogs(index, logDataArray) {
  try {
    const body = logDataArray.flatMap((logData) => [
      { index: { _index: index } },
      logData,
    ]);
    const response = await client.bulk({ body });
    return response;
  } catch (error) {
    console.error(`Error indexing logs:`, error);
    return error;
  }
}

async function searchLogs(index, timestampFilter, fields) {
  try {
    const mustClauses = [];
    const rangeFilter = {};

    fields.forEach(({ fieldName, fieldValue }) => {
      mustClauses.push({ term: { [`${fieldName}.keyword`]: fieldValue } });
    });

    if (Object.keys(timestampFilter).length > 0) {
      rangeFilter["timestamp"] = {
        gte: timestampFilter.startTime,
        lte: timestampFilter.endTime,
      };
    }

    const query = {
      bool: {
        must: mustClauses,
      },
    };

    if (Object.keys(rangeFilter).length > 0) {
      query.bool.must.push({ range: rangeFilter });
    }

    const response = await client.search({
      index: index,
      body: {
        query: query,
      },
    });

    return response.hits.hits;
  } catch (error) {
    console.error("Error searching logs:", error);
    return error;
  }
}

module.exports = { indexLogs, searchLogs };
