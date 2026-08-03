# Databricks MCP Quickstart for Cursor

This project includes `.cursor/mcp.json` with multiple Databricks server profiles:

1. Functions: `databricks-functions-pat`, `databricks-functions-oauth`
2. SQL: `databricks-sql-pat`, `databricks-sql-oauth`
3. Genie: `databricks-genie-pat`, `databricks-genie-oauth`
4. AI Search: `databricks-ai-search-pat`, `databricks-ai-search-oauth`
5. Local fallback: `databricks-mcp-local` (community local MCP via `uvx databricks-mcp-server@latest`)

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
export DATABRICKS_GENIE_SPACE_ID="<genie-space-id>"
export DATABRICKS_AI_SEARCH_INDEX="<index-name>"
export DATABRICKS_OAUTH_CLIENT_ID="<oauth-client-id>"
export DATABRICKS_OAUTH_CLIENT_SECRET="<oauth-client-secret>"
```

## Final steps

1. Restart Cursor.
2. Open Cursor settings -> Tools & Integrations -> MCP Tools.
3. Confirm the Databricks servers are listed.
4. If using OAuth, click Connect for whichever OAuth Databricks profiles you want.

## Notes

- PAT gives quick access for individual use.
- OAuth is recommended for longer-term and team setups.
- Tool access is limited by Databricks permissions attached to your token or OAuth scopes.
- The workspace host must be your real Databricks workspace URL (for example `https://<instance>.cloud.databricks.com`).
- Workspace ID (`o=<id>`) and Open Sharing ID (`aws:<region>:<uuid>`) are not valid MCP endpoint URLs by themselves.
