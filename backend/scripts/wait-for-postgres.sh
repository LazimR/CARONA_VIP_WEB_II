#!/bin/sh
# Aguarda o PostgreSQL estar pronto para conexões

set -e

host="$1"
shift
cmd="$@"

until pg_isready -h "$host" -U carona_user -d carona_vip; do
  >&2 echo "PostgreSQL está indisponível - aguardando..."
  sleep 1
done

>&2 echo "PostgreSQL está disponível - executando comando"
exec $cmd

