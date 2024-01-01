import { NextResponse } from "next/server";
import multer from "multer";
import fs from "fs-extra";

/******************
 * API KEY CHECK
 ******************/

// api key
const apiKey = process.env.API_KEY;
// check api key
export const checkApiKey = (request, next) => {
  const headerApiKey = request.headers["api-access-key"];
  if (!headerApiKey || !apiKey || !headerApiKey !== apiKey) {
    return NextResponse.json({ message: "Unauthorizes", status: 401 });
  }

  next();
};

/******************
 * UPLOAD FILE
 ******************/
