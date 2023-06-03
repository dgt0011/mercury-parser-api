import Parser from '@postlight/parser';

import {
  corsSuccessResponse,
  corsErrorResponse,
  runWarm,
} from './utils/index.ts';

const parseHtml = async ({ body }, context, cb) => {
  const { url, html } = JSON.parse(body);

  const result = await Parser.parse(url, { contentType: 'text', html });

  return cb(
    null,
    result
      ? corsSuccessResponse(result)
      : corsErrorResponse({ message: 'There was an error parsing that URL.' })
  );
};

export default runWarm(parseHtml);
