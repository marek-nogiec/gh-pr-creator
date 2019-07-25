#!/usr/bin/env node

require('dotenv').config()
const Octokit = require('@octokit/rest')

const { ACCESS_TOKEN, OWNER: owner } = process.env

const defaultBase = head => {
  switch (head) {
    case 'develop':
      return 'pre-master'
    case 'pre-master':
      return 'master'
    default:
      return 'develop'
  }
}

const [,, repositories, head, base = defaultBase(head)] = process.argv

if (!head) throw new Error('You need to provide base for the PR')

const repos = repositories.split(',')

const client = new Octokit({
  auth: ACCESS_TOKEN
})

const main = async () => {
  const prs = await Promise.all(repos.map(async repo => {
    try {
      return await client.pulls.create({
        owner,
        repo,
        title: `${head} -> ${base}`,
        head,
        base
      })
    } catch (e) {
      console.log(`Couldn't create a PR for ${repo}`)
      console.log(e)
    }
  }))
  console.log(prs.map(({ data: { url } }) => url))
}

main()
