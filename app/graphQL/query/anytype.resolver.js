const { GraphQLScalarType, Kind } = require("graphql");


function prseValue(value) {
    if (typeof value === "object") {
        return value
    }
    if (typeof value === "string" && value.charAt(0) === "{") {
        return JSON.parse(value)
    }
}

function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return Number(valueNode.value)
    
        default:
            break;
    }
}




const antype = new GraphQLScalarType({
    name: "anytype",
    parseValue: (value) => {
        if (typeof value === "object") {
            return value
        }
        if (typeof value === "string" && value.charAt(0) === "{") {
            return JSON.parse(value)
        }
        return null;
    },
    serialize: (value) => {
        if (typeof value === "object") {
            return value
        }
        if (typeof value === "string" && value.charAt(0) === "{") {
            return JSON.parse(value)
        }
        return null;
    },
    parseLiteral: (valueNode) => {
        switch (valueNode.kind) {
            case Kind.STRING:
                return valueNode.value.charAt(0) === "{" ? JSON.parse(valueNode.value) : valueNode.value
            case Kind.INT:
            case Kind.FLOAT:
                return Number(valueNode.value)
            case Kind.OBJECT:
                const obj = Object.create(null);
                valueNode.fields.forEach(field => {
                    obj[field.name.value] = parseValueNode(field.value)
                })

            default:
                break;
        }
    }
})

module.exports = {
    antype
}