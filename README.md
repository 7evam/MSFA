# MSFA

<img src="https://rofl-public-assets.s3.us-east-2.amazonaws.com/msfa_logo.svg" width="150" height="150">

MSFA is a web application that allows participants to draft a fantasy sports squad consiting of sports teams from the 4 major sports and compete with their friends during a 14 month period that spans the full MLB, NFL, NBA and NHL seasons. Participants can bid on unowned teams every month, add and drop teams, and make trades with other participants in their league. Scoring is based on teams winning regular season and playoff games and each month represents a new scoring period where participants can change up their roster.

## Tech
MSFA is built with React on the front end. This repo holds the front end code. The backend consists of APIs built with Node and hosted on AWS Lambda functions and cron job functions to update team scores and roster moves that process at the end of the month.
