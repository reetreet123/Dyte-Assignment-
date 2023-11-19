// Function to index logs in Elasticsearch
async function indexLogs(index, logData) {
  try {
    const response = await client.index({
      index: index,
      body: logData,
    });

    console.log(`Log indexed successfully! Response:`, response);
    return response;
  } catch (error) {
    console.error(`Error indexing log:`, error);
    return error;
  }
}

// Function to search all logs in Elasticsearch
async function searchAllLogs(index) {
  try {
    const response = await client.search({
      index: index,
      body: {
        query: {
          match_all: {},
        },
      },
    });

    // console.log(`Search results:`, response.hits.hits);
    return response.hits.hits;
  } catch (error) {
    console.error(`Error searching logs:`, error);
    return error;
  }
}

// Function to search logs in Elasticsearch
async function searchLogs(index, fieldName, fieldValue) {
  try {
    const mp = {};
    mp[`${fieldName}`] = fieldValue;
    const response = await client.search({
      index: index,
      body: {
        query: {
          match: mp,
        },
      },
    });
    console.log(`Search results:`, response.hits.hits);
    return response.hits.hits;
  } catch (error) {
    console.error(`Error searching logs:`, error);
    return error;
  }
}

// Function to search logs in Elasticsearch using multiple filters
async function searchLogsMultiQueries(index, fields) {
  try {
    const mustClauses = fields.map(({ fieldName, fieldValue }) => ({
      term: { [`${fieldName}.keyword`]: fieldValue },
    }));
    const response = await client.search({
      index: index,
      body: {
        query: {
          bool: {
            must: mustClauses,
          },
        },
      },
    });
    return response;
  } catch (error) {
    // Handle errors
    console.error("Error searching logs:", error);
    throw error;
  }
}

// Function to filter logs based on timestamps
async function filterLogsByTimestamp(index, startTime, endTime) {
  try {
    const response = await client.search({
      index: index,
      body: {
        query: {
          range: {
            timestamp: {
              gte: startTime,
              lte: endTime,
            },
          },
        },
      },
    });

    console.log(`Filtered logs successfully! Response:`, response.hits.hits);
    return response.hits.hits;
  } catch (error) {
    console.error(`Error filtering logs:`, error);
    return error;
  }
}

// Function to search the logs based on timestamp filter
async function searchLogs(index, timestampFilter) {
  try {
    const Range = {};
    const mustClauses = fields.map(({ fieldName, fieldValue }) => ({
      term: { [`${fieldName}.keyword`]: fieldValue },
    }));
    const response = await client.search({
      index: index,
      body: {
        query: {
          bool: {
            must: [
              {
                range: {
                  timestamp: {
                    gte: timestampFilter.startTime,
                    lte: timestampFilter.endTime,
                  },
                },
              },
              { match: { "spanId.keyword": spanIdFilter } },
            ],
          },
        },
      },
    });

    console.log("Logs found successfully! Response:", response);
    return response.hits.hits;
  } catch (error) {
    console.error("Error searching logs:", error);
    return error;
  }
}
