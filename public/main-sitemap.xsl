<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap — Lastaar</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="robots" content="noindex,follow"/>
        <style type="text/css">
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #444;
            background: #f0f0f1;
            line-height: 1.5;
          }
          a { color: #a30098; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .wrap {
            max-width: 980px;
            margin: 40px auto;
            padding: 0 20px 40px;
          }
          .card {
            background: #fff;
            border: 1px solid #c3c4c7;
            border-radius: 8px;
            box-shadow: 0 1px 1px rgba(0,0,0,.04);
            overflow: hidden;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 22px 28px;
            border-bottom: 1px solid #dcdcde;
            background: linear-gradient(180deg, #fff 0%, #fafafa 100%);
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 0;
          }
          .brand img {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            object-fit: contain;
            background: #111;
          }
          .brand h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 600;
            color: #1d2327;
          }
          .brand p {
            margin: 2px 0 0;
            font-size: 13px;
            color: #646970;
          }
          .badge {
            flex-shrink: 0;
            padding: 6px 10px;
            border-radius: 999px;
            background: rgba(163,0,152,.08);
            color: #a30098;
            font-size: 12px;
            font-weight: 600;
          }
          .intro {
            padding: 18px 28px;
            border-bottom: 1px solid #dcdcde;
            background: #fcfcfc;
            font-size: 14px;
            color: #50575e;
          }
          .intro strong { color: #1d2327; }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
          }
          thead th {
            text-align: left;
            padding: 12px 28px;
            background: #f6f7f7;
            border-bottom: 1px solid #dcdcde;
            color: #1d2327;
            font-weight: 600;
          }
          tbody td {
            padding: 12px 28px;
            border-bottom: 1px solid #f0f0f1;
            vertical-align: top;
            word-break: break-word;
          }
          tbody tr:hover td { background: #fbf7fb; }
          tbody tr:last-child td { border-bottom: 0; }
          .muted { color: #646970; white-space: nowrap; }
          .footer {
            margin-top: 18px;
            text-align: center;
            font-size: 12px;
            color: #646970;
          }
          @media (max-width: 720px) {
            .header { flex-direction: column; align-items: flex-start; }
            thead th, tbody td { padding: 12px 16px; }
            .intro { padding: 16px; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="card">
            <div class="header">
              <div class="brand">
                <img src="/Nextaar.png" alt="Lastaar"/>
                <div>
                  <h1>XML Sitemap</h1>
                  <p>Generated for search engines and AI crawlers</p>
                </div>
              </div>
              <div class="badge">Lastaar</div>
            </div>

            <xsl:choose>
              <xsl:when test="sitemap:sitemapindex">
                <div class="intro">
                  This XML Sitemap Index contains
                  <strong><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></strong>
                  sitemaps. This is the index file. Browse a child sitemap for individual URLs.
                </div>
                <table>
                  <thead>
                    <tr>
                      <th style="width:70%">Sitemap</th>
                      <th>Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                      <tr>
                        <td>
                          <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                        </td>
                        <td class="muted">
                          <xsl:value-of select="concat(substring(sitemap:lastmod,0,11), concat(' ', substring(sitemap:lastmod,12,5)))"/>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:when>
              <xsl:otherwise>
                <div class="intro">
                  This XML Sitemap contains
                  <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
                  URLs. You can find more information about XML sitemaps at
                  <a href="https://www.sitemaps.org/" target="_blank" rel="noopener">sitemaps.org</a>.
                </div>
                <table>
                  <thead>
                    <tr>
                      <th style="width:60%">URL</th>
                      <th>Images</th>
                      <th>Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:urlset/sitemap:url">
                      <tr>
                        <td>
                          <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                        </td>
                        <td class="muted">0</td>
                        <td class="muted">
                          <xsl:value-of select="concat(substring(sitemap:lastmod,0,11), concat(' ', substring(sitemap:lastmod,12,5)))"/>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:otherwise>
            </xsl:choose>
          </div>
          <div class="footer">
            XML Sitemap · <a href="https://lastaar.com">lastaar.com</a>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
