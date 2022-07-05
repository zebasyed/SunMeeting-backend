const ResponseStructure = require('./responseStructure');

const Response_Types = { SUCCESS: 0, FAIL: 1, NOTFOUND: 2 };

const createResponse = (data, responseType) => {
    let finalResponse;
    switch(responseType) {
        case Response_Types.SUCCESS:
            finalResponse = createSucessResponse(data);
        break;
    }
    return finalResponse;
}

function createSucessResponse(data) {
    let structure = ResponseStructure.Success_Response;
    structure.data = data;
    console.log(structure);
    return structure;
}

module.exports = {createResponse};

