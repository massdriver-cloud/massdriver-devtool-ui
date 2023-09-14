import ConnectionsView from './ConnectionsView'

const MOCK_DATA = {
  "$id": "https://schemas.massdriver.cloud/schemas/bundles/test-bundle/schema-connections.json",
  "$schema": "http://json-schema.org/draft-07/schema",
  "description": "A test bundle",
  "properties": {
    "api_gateway": {
      "$id": "https://api.massdriver.cloud/artifact-definitions/massdriver/aws-api-gateway-rest-api",
      "$md": {
        "access": "public",
        "name": "aws-api-gateway-rest-api"
      },
      "$schema": "http://json-schema.org/draft-07/schema",
      "additionalProperties": false,
      "description": "AWS API Gateway and it's Default Stage",
      "properties": {
        "data": {
          "properties": {
            "infrastructure": {
              "properties": {
                "arn": {
                  "$schema": "http://json-schema.org/draft-07/schema",
                  "description": "Amazon Resource Name format for API Gateway and related resources",
                  "examples": [
                    "arn:partition:apigateway:region::/restapis/api-id",
                    "arn:partition:apigateway:region::/restapis/api-id/stages/stage-id"
                  ],
                  "message": {
                    "pattern": "Correct format of an arn described here: https://docs.aws.amazon.com/apigateway/latest/developerguide/arn-format-reference.html"
                  },
                  "pattern": "^arn:aws:[a-zA-Z0-9._-]*:[a-zA-Z0-9._-]*:(?:[0-9]{12})?:[/a-zA-Z0-9._-]+(?:[/:][a-zA-Z0-9/._-]+)?(?:/[0-9-T:.]+)?$",
                  "title": "AWS API Gateway ARN",
                  "type": "string"
                },
                "root_resource_id": {
                  "description": "Id of the API Gateway resource at the '/' route",
                  "title": "Root Resource Id",
                  "type": "string"
                },
                "stage_arn": {
                  "$schema": "http://json-schema.org/draft-07/schema",
                  "description": "Amazon Resource Name format for API Gateway and related resources",
                  "examples": [
                    "arn:partition:apigateway:region::/restapis/api-id",
                    "arn:partition:apigateway:region::/restapis/api-id/stages/stage-id"
                  ],
                  "message": {
                    "pattern": "Correct format of an arn described here: https://docs.aws.amazon.com/apigateway/latest/developerguide/arn-format-reference.html"
                  },
                  "pattern": "^arn:aws:[a-zA-Z0-9._-]*:[a-zA-Z0-9._-]*:(?:[0-9]{12})?:[/a-zA-Z0-9._-]+(?:[/:][a-zA-Z0-9/._-]+)?(?:/[0-9-T:.]+)?$",
                  "title": "AWS API Gateway ARN",
                  "type": "string"
                }
              },
              "required": [
                "arn",
                "stage_arn",
                "root_resource_id"
              ],
              "title": "Infrastructure",
              "type": "object"
            }
          },
          "required": [
            "infrastructure"
          ],
          "title": "Artifact Data",
          "type": "object"
        },
        "specs": {
          "properties": {
            "aws": {
              "$schema": "http://json-schema.org/draft-07/schema",
              "description": "",
              "properties": {
                "region": {
                  "$schema": "http://json-schema.org/draft-07/schema",
                  "description": "AWS Region to provision in.",
                  "examples": [
                    "us-west-2"
                  ],
                  "title": "Region",
                  "type": "string"
                }
              },
              "required": [],
              "title": "AWS Artifact Specs",
              "type": "object"
            }
          },
          "title": "Artifact Specs",
          "type": "object"
        }
      },
      "required": [
        "data",
        "specs"
      ],
      "title": "AWS API Gateway REST API",
      "type": "object"
    },
    "aws_authentication": {
      "$id": "https://api.massdriver.cloud/artifact-definitions/massdriver/aws-iam-role",
      "$md": {
        "access": "public",
        "cloud": {
          "id": "aws",
          "regions": [
            {
              "code": "us-east-2",
              "name": "US East (Ohio)"
            },
            {
              "code": "us-east-1",
              "name": "US East (N. Virginia)"
            },
            {
              "code": "us-west-1",
              "name": "US West (N. California)"
            },
            {
              "code": "us-west-2",
              "name": "US West (Oregon)"
            },
            {
              "code": "af-south-1",
              "name": "Africa (Cape Town)",
              "restrictions": "opt-in"
            },
            {
              "code": "ap-east-1",
              "name": "Asia Pacific (Hong Kong)",
              "restrictions": "opt-in"
            },
            {
              "code": "ap-south-2",
              "name": "Asia Pacific (Hyderabad)",
              "restrictions": "opt-in"
            },
            {
              "code": "ap-southeast-3",
              "name": "Asia Pacific (Jakarta)",
              "restrictions": "opt-in"
            },
            {
              "code": "ap-southeast-4",
              "name": "Asia Pacific (Melbourne)",
              "restrictions": "opt-in"
            },
            {
              "code": "ap-south-1",
              "name": "Asia Pacific (Mumbai)"
            },
            {
              "code": "ap-northeast-3",
              "name": "Asia Pacific (Osaka)"
            },
            {
              "code": "ap-northeast-2",
              "name": "Asia Pacific (Seoul)"
            },
            {
              "code": "ap-southeast-1",
              "name": "Asia Pacific (Singapore)"
            },
            {
              "code": "ap-southeast-2",
              "name": "Asia Pacific (Sydney)"
            },
            {
              "code": "ap-northeast-1",
              "name": "Asia Pacific (Tokyo)"
            },
            {
              "code": "ca-central-1",
              "name": "Canada (Central)"
            },
            {
              "code": "eu-central-1",
              "name": "Europe (Frankfurt)"
            },
            {
              "code": "eu-west-1",
              "name": "Europe (Ireland)"
            },
            {
              "code": "eu-west-2",
              "name": "Europe (London)"
            },
            {
              "code": "eu-south-1",
              "name": "Europe (Milan)",
              "restrictions": "opt-in"
            },
            {
              "code": "eu-west-3",
              "name": "Europe (Paris)"
            },
            {
              "code": "eu-south-2",
              "name": "Europe (Spain)",
              "restrictions": "opt-in"
            },
            {
              "code": "eu-north-1",
              "name": "Europe (Stockholm)"
            },
            {
              "code": "eu-central-2",
              "name": "Europe (Zurich)",
              "restrictions": "opt-in"
            },
            {
              "code": "me-south-1",
              "name": "Middle East (Bahrain)",
              "restrictions": "opt-in"
            },
            {
              "code": "me-central-1",
              "name": "Middle East (UAE)",
              "restrictions": "opt-in"
            },
            {
              "code": "sa-east-1",
              "name": "South America (São Paulo)"
            },
            {
              "code": "us-gov-east-1",
              "name": "AWS GovCloud (US-East)",
              "restrictions": "by-request"
            },
            {
              "code": "us-gov-west-1",
              "name": "AWS GovCloud (US-West)",
              "restrictions": "by-request"
            }
          ]
        },
        "containerRepositories": {
          "cloud": "aws",
          "label": "ECR"
        },
        "defaultTargetConnectionGroup": "credentials",
        "defaultTargetConnectionGroupLabel": "AWS IAM Role",
        "diagram": {
          "isLinkable": false
        },
        "dnsZones": {
          "cloud": "aws",
          "label": "AWS Route 53"
        },
        "importing": {
          "group": "authentication"
        },
        "name": "aws-iam-role"
      },
      "$schema": "http://json-schema.org/draft-07/schema",
      "additionalProperties": false,
      "description": "",
      "properties": {
        "data": {
          "properties": {
            "arn": {
              "$schema": "http://json-schema.org/draft-07/schema",
              "description": "Amazon Resource Name",
              "examples": [
                "arn:aws:rds::ACCOUNT_NUMBER:db/prod",
                "arn:aws:ec2::ACCOUNT_NUMBER:vpc/vpc-foo"
              ],
              "message": {
                "pattern": "Correct format of an arn described here: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html"
              },
              "pattern": "^arn:aws:[a-zA-Z0-9._-]*:[a-zA-Z0-9._-]*:(?:[0-9]{12})?:[a-zA-Z0-9/:._-]+$",
              "title": "AWS ARN",
              "type": "string"
            },
            "external_id": {
              "description": "An external ID is a piece of data that can be passed to the AssumeRole API of the Security Token Service (STS). You can then use the external ID in the condition element in a role's trust policy, allowing the role to be assumed only when a certain value is present in the external ID.",
              "title": "External ID",
              "type": "string"
            }
          },
          "required": [
            "arn"
          ],
          "title": "Artifact Data",
          "type": "object"
        },
        "specs": {
          "properties": {
            "aws": {
              "$schema": "http://json-schema.org/draft-07/schema",
              "description": "",
              "properties": {
                "region": {
                  "$schema": "http://json-schema.org/draft-07/schema",
                  "description": "AWS Region to provision in.",
                  "examples": [
                    "us-west-2"
                  ],
                  "title": "Region",
                  "type": "string"
                }
              },
              "required": [],
              "title": "AWS Artifact Specs",
              "type": "object"
            }
          },
          "title": "Artifact Specs",
          "type": "object"
        }
      },
      "required": [
        "data",
        "specs"
      ],
      "title": "AWS IAM Role",
      "type": "object"
    },
    "aws_vpc": {
      "$id": "https://api.massdriver.cloud/artifact-definitions/massdriver/aws-vpc",
      "$md": {
        "access": "public",
        "defaultTargetConnectionGroup": "networking",
        "defaultTargetConnectionGroupLabel": "AWS",
        "importing": {
          "group": "networking"
        },
        "name": "aws-vpc"
      },
      "$schema": "http://json-schema.org/draft-07/schema",
      "additionalProperties": false,
      "description": "",
      "properties": {
        "data": {
          "properties": {
            "infrastructure": {
              "properties": {
                "arn": {
                  "$schema": "http://json-schema.org/draft-07/schema",
                  "description": "Amazon Resource Name",
                  "examples": [
                    "arn:aws:rds::ACCOUNT_NUMBER:db/prod",
                    "arn:aws:ec2::ACCOUNT_NUMBER:vpc/vpc-foo"
                  ],
                  "message": {
                    "pattern": "Correct format of an arn described here: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html"
                  },
                  "pattern": "^arn:aws:[a-zA-Z0-9._-]*:[a-zA-Z0-9._-]*:(?:[0-9]{12})?:[a-zA-Z0-9/:._-]+$",
                  "title": "AWS ARN",
                  "type": "string"
                },
                "cidr": {
                  "$schema": "http://json-schema.org/draft-07/schema",
                  "examples": [
                    "10.100.0.0/16",
                    "192.24.12.0/22"
                  ],
                  "message": {
                    "pattern": "Correct format of CIDR range is IPv4 address and subnet mask for example: 10.0.0.0/24"
                  },
                  "pattern": "^(?:[0-9]|[0-9]{2}|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\\.(?:[0-9]|[0-9]{2}|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}(?:/(?:[1-9]|1[0-9]|2[0-9]|3[0-2]))$",
                  "type": "string"
                },
                "internal_subnets": {
                  "items": {
                    "$schema": "http://json-schema.org/draft-07/schema",
                    "description": "AWS VCP Subnet",
                    "examples": [],
                    "properties": {
                      "arn": {
                        "$schema": "http://json-schema.org/draft-07/schema",
                        "description": "Amazon Resource Name",
                        "examples": [
                          "arn:aws:rds::ACCOUNT_NUMBER:db/prod",
                          "arn:aws:ec2::ACCOUNT_NUMBER:vpc/vpc-foo"
                        ],
                        "message": {
                          "pattern": "Correct format of an arn described here: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html"
                        },
                        "pattern": "^arn:aws:[a-zA-Z0-9._-]*:[a-zA-Z0-9._-]*:(?:[0-9]{12})?:[a-zA-Z0-9/:._-]+$",
                        "title": "AWS ARN",
                        "type": "string"
                      },
                      "aws_zone": {
                        "$schema": "http://json-schema.org/draft-07/schema",
                        "description": "AWS Availability Zone",
                        "examples": [],
                        "title": "AWS Zone",
                        "type": "string"
                      },
                      "cidr": {
                        "$schema": "http://json-schema.org/draft-07/schema",
                        "examples": [
                          "10.100.0.0/16",
                          "192.24.12.0/22"
                        ],
                        "message": {
                          "pattern": "Correct format of CIDR range is IPv4 address and subnet mask for example: 10.0.0.0/24"
                        },
                        "pattern": "^(?:[0-9]|[0-9]{2}|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\\.(?:[0-9]|[0-9]{2}|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}(?:/(?:[1-9]|1[0-9]|2[0-9]|3[0-2]))$",
                        "type": "string"
                      }
                    },
                    "required": [
                      "arn",
                      "cidr",
                      "aws_zone"
                    ],
                    "title": "AWS Subnet",
                    "type": "object"
                  },
                  "type": "array"
                },
                "private_subnets": {
                  "items": {
                    "$schema": "http://json-schema.org/draft-07/schema",
                    "description": "AWS VCP Subnet",
                    "examples": [],
                    "properties": {
                      "arn": {
                        "$schema": "http://json-schema.org/draft-07/schema",
                        "description": "Amazon Resource Name",
                        "examples": [
                          "arn:aws:rds::ACCOUNT_NUMBER:db/prod",
                          "arn:aws:ec2::ACCOUNT_NUMBER:vpc/vpc-foo"
                        ],
                        "message": {
                          "pattern": "Correct format of an arn described here: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html"
                        },
                        "pattern": "^arn:aws:[a-zA-Z0-9._-]*:[a-zA-Z0-9._-]*:(?:[0-9]{12})?:[a-zA-Z0-9/:._-]+$",
                        "title": "AWS ARN",
                        "type": "string"
                      },
                      "aws_zone": {
                        "$schema": "http://json-schema.org/draft-07/schema",
                        "description": "AWS Availability Zone",
                        "examples": [],
                        "title": "AWS Zone",
                        "type": "string"
                      },
                      "cidr": {
                        "$schema": "http://json-schema.org/draft-07/schema",
                        "examples": [
                          "10.100.0.0/16",
                          "192.24.12.0/22"
                        ],
                        "message": {
                          "pattern": "Correct format of CIDR range is IPv4 address and subnet mask for example: 10.0.0.0/24"
                        },
                        "pattern": "^(?:[0-9]|[0-9]{2}|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\\.(?:[0-9]|[0-9]{2}|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}(?:/(?:[1-9]|1[0-9]|2[0-9]|3[0-2]))$",
                        "type": "string"
                      }
                    },
                    "required": [
                      "arn",
                      "cidr",
                      "aws_zone"
                    ],
                    "title": "AWS Subnet",
                    "type": "object"
                  },
                  "type": "array"
                },
                "public_subnets": {
                  "items": {
                    "$schema": "http://json-schema.org/draft-07/schema",
                    "description": "AWS VCP Subnet",
                    "examples": [],
                    "properties": {
                      "arn": {
                        "$schema": "http://json-schema.org/draft-07/schema",
                        "description": "Amazon Resource Name",
                        "examples": [
                          "arn:aws:rds::ACCOUNT_NUMBER:db/prod",
                          "arn:aws:ec2::ACCOUNT_NUMBER:vpc/vpc-foo"
                        ],
                        "message": {
                          "pattern": "Correct format of an arn described here: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html"
                        },
                        "pattern": "^arn:aws:[a-zA-Z0-9._-]*:[a-zA-Z0-9._-]*:(?:[0-9]{12})?:[a-zA-Z0-9/:._-]+$",
                        "title": "AWS ARN",
                        "type": "string"
                      },
                      "aws_zone": {
                        "$schema": "http://json-schema.org/draft-07/schema",
                        "description": "AWS Availability Zone",
                        "examples": [],
                        "title": "AWS Zone",
                        "type": "string"
                      },
                      "cidr": {
                        "$schema": "http://json-schema.org/draft-07/schema",
                        "examples": [
                          "10.100.0.0/16",
                          "192.24.12.0/22"
                        ],
                        "message": {
                          "pattern": "Correct format of CIDR range is IPv4 address and subnet mask for example: 10.0.0.0/24"
                        },
                        "pattern": "^(?:[0-9]|[0-9]{2}|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\\.(?:[0-9]|[0-9]{2}|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}(?:/(?:[1-9]|1[0-9]|2[0-9]|3[0-2]))$",
                        "type": "string"
                      }
                    },
                    "required": [
                      "arn",
                      "cidr",
                      "aws_zone"
                    ],
                    "title": "AWS Subnet",
                    "type": "object"
                  },
                  "type": "array"
                }
              },
              "required": [
                "arn",
                "cidr",
                "private_subnets",
                "public_subnets",
                "internal_subnets"
              ],
              "title": "Infrastructure configuration",
              "type": "object"
            }
          },
          "required": [
            "infrastructure"
          ],
          "title": "Artifact Data",
          "type": "object"
        },
        "specs": {
          "properties": {
            "aws": {
              "$schema": "http://json-schema.org/draft-07/schema",
              "description": "",
              "properties": {
                "region": {
                  "$schema": "http://json-schema.org/draft-07/schema",
                  "description": "AWS Region to provision in.",
                  "examples": [
                    "us-west-2"
                  ],
                  "title": "Region",
                  "type": "string"
                }
              },
              "required": [],
              "title": "AWS Artifact Specs",
              "type": "object"
            }
          },
          "title": "Artifact Specs",
          "type": "object"
        }
      },
      "required": [
        "data"
      ],
      "title": "AWS Virtual Private Cloud",
      "type": "object"
    }
  },
  "required": [
    "aws_authentication",
    "api_gateway",
    "aws_authentication",
    "aws_vpc"
  ],
  "title": "test-bundle"
}


const EnhancedConnectionsView = () => {
  const connectionTypes = Object.keys(MOCK_DATA?.properties).map(key => MOCK_DATA?.properties?.[key]?.$md?.name)
  console.log({ connectionTypes })
  return (
    <ConnectionsView

    />
  )
}

export default EnhancedConnectionsView
