# Databricks MCP Quickstart for Cursor

This project includes `.cursor/mcp.json` with three Databricks server profiles:

1. `databricks-uc-pat` (managed MCP + PAT)
2. `databricks-uc-oauth` (managed MCP + OAuth)
3. `databricks-mcp-local` (community local MCP via `uvx databricks-mcp-server@latest`)

## Required environment variables

Set these in your local shell (or OS env) before launching Cursor:

```bash
export DATABRICKS_HOST="https://<your-workspace-hostname>"
export DATABRICKS_CATALOG="<catalog>"
export DATABRICKS_SCHEMA="<schema>"
export DATABRICKS_TOKEN="<personal-access-token>"
```

Optional values:

```bash
export DATABRICKS_WAREHOUSE_ID="<warehouse-id>"
export DATABRICKS_OAUTH_CLIENT_ID="<oauth-client-id>"
export DATABRICKS_OAUTH_CLIENT_SECRET="<oauth-client-secret>"
```

## Final steps

1. Restart Cursor.
2. Open Cursor settings -> Tools & Integrations -> MCP Tools.
3. Confirm the Databricks servers are listed.
4. If using OAuth, click Connect for `databricks-uc-oauth`.

## Notes

- PAT gives quick access for individual use.
- OAuth is recommended for longer-term and team setups.
- Tool access is limited by Databricks permissions attached to your token or OAuth scopes.
