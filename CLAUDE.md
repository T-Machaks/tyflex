You are auditing this repo before we add a new feature. Do not modify any files.

Feature: an "Electrical Plan Designer". A client uploads a floor plan (PDF/image),
AI extracts the layout, a deterministic rules engine generates a basic residential
electrical design, the client views it in 2D and 3D, then submits an RFQ that
becomes a draft quote in Tyflex Office (office.tyflex.co.zw).

Report on:
1. Framework, routing, data layer, auth, and how file uploads are handled today.
2. Whether the public site and Tyflex Office share a repo, database, or packages,
   and the cleanest place for a shared rules-engine module.
3. Existing quote/RFQ and Catalogue models the feature should reuse.
4. Any existing AWS SDK or Bedrock usage we can extend.
5. A proposed folder structure, DB migrations, and API routes for the feature.
6. Risks, unknowns, and questions for me.

Output a single markdown file, docs/electrical-designer-audit.md. No code changes.
