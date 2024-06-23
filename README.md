# PrettyPlanner (frontend)

This repository contains the frontend for a To-Do List application, built with Next.js and deployed on Vercel. This project is currently a work in progress.

## Live Demo

You can view the current version of the application [here](https://prettyplanner.vercel.app/).

## Features (Work in Progress)

- View to-do lists
- Create new to-do lists
- Delete to-do lists
- Add items to a to-do list
- Remove items from a to-do list
- Mark items as complete or incomplete

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Vercel (for deployment)

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Setup Instructions

1. Clone the repository:

`git clone https://github.com/rmachaal/prettyplanner-frontend.git`

2. Install dependencies:

`npm install --legacy-peer-deps && npm install react@latest react-dom@latest`

Note: `npm install` may not work due to peer dependency issues. If you encounter problems, use the command above.

3. Set up environment variables:

   - Create a `.env.local` file in the root directory
   - Add the following variables:
     
     KV_URL=your_kv_url_here
     KV_REST_API_URL=your_kv_rest_api_url_here
     KV_REST_API_TOKEN=your_kv_rest_api_token_here
     KV_REST_API_READ_ONLY_TOKEN=your_kv_rest_api_read_only_token_here
     
   The `KV_` variables are for Vercel KV, a serverless Redis database. You'll need to set up a Vercel KV instance and obtain these values from your Vercel dashboard.

4. Run the development server:

`npm run dev`

Open http://localhost:3000 with your browser to see the result.

## Deployment

This project is set up for deployment on Vercel. Any push to the main branch will trigger a new deployment. To deploy your own version:

1. Fork this repository
2. Sign up for a Vercel account if you haven't already
3. Connect your GitHub account to Vercel
4. Create a new project in Vercel and select this repository
5. Configure your environment variables in the Vercel dashboard
6. In the Build & Development Settings of your Vercel project, set the Build Command to:

`npm run build`

and set the Install Command as required above. 

## Next Steps

- Implement key features
- Improve UI/UX design 
- Implement user authentication
