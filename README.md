# PR creator for Github

## Installation
```sh
yarn
cp .env.local .env
// edit .env to add your GitHub personal auth token and default OWNER for the repos you'll be working with
```

## Usage
```sh
yarn create REPOSITORIES HEAD [BASE]
```

- `REPOSITORIES` can be a comma separated list of repos under the same owner
- `HEAD` is the name of the branch with your changes
- `BASE` is optional, it's default value is calculated based on `HEAD`:
   - `HEAD`: `develop` => `BASE`: `pre-master`
   - `HEAD`: `pre-mater` => `BASE`: `master`
   - in all other cases `BASE` is `develop`
