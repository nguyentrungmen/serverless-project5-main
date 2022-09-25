import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors} from 'middy/middlewares'
import { updateTopicItem } from '../../businessLogic/topics'
import { UpdateTopicRequest } from '../../requests/UpdateTopicRequest'
import { createLogger } from '../../utils/logger'

const logger = createLogger('topics');
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {    
    const updatedTopic: UpdateTopicRequest = JSON.parse(event.body)
    // TODO: Update a TOPIC item with the provided id using values in the "updatedTopic" object
    const isExist = await updateTopicItem(event, updatedTopic);
    console.log("Check existing" + isExist);
    logger.info("Check existing" + isExist);
    // check topic item is existing or not first
    if (!isExist) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'ERROR, this topic item not found'
        })
      };
    }
    logger.info("Topic item has been updated");
    // then update it
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({})
    }
  })


  handler  
  .use(
    cors({
      credentials: true
    })
  )

