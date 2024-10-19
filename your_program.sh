set -e # Exit early if any commands fail
exec node $(dirname "$0")/app/main.js "$@"