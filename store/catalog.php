<?php
/**
 * Product catalog. Prices are set here (inline price_data at checkout), so adding a
 * product = add an entry + drop the zip into store/files/. Keep SKUs stable.
 */

declare(strict_types=1);

/** E7: honest, dated launch price. Checkout charges $19 until this instant (UTC), then $29 again
 *  automatically. The storefront switches its displayed price at the same instant. */
const AOK_LAUNCH_END = '2026-11-03T00:00:00Z';

function catalog_all(?int $now = null): array {
    $launch = ($now ?? time()) < strtotime(AOK_LAUNCH_END);
    return [
        'AOK-1' => [
            'name'        => 'Agent Ops Kit — the D.O.E. framework for Claude Code',
            'description' => 'Directive / Orchestration / Execution: the CLAUDE.md, directive templates, execution-script scaffolds, lint checks, and the self-annealing loop that keep AI coding agents reliable in production.',
            'price_cents' => $launch ? 1900 : 2900,
            'currency'    => 'usd',
            'file'        => 'agent-ops-kit-v1.zip',
            'download_name' => 'agent-ops-kit-v1.zip',
            'max_downloads' => 20,
        ],
        // E9 (sprint 2026-10-19): second product line for the Force-Test audience.
        'QA-TPL-1' => [
            'name'        => 'Fastener & Anchor Pull-Test Templates v1',
            'description' => 'Excel pull-test report with automatic PASS/FAIL and statistics, ultimate-load sheet (mean, s, CoV, characteristic value), calibration log, unit converter, printable procedure checklist and an ASTM/ISO/ACI/ICC-ES standards index.',
            'price_cents' => 4900,
            'currency'    => 'usd',
            'file'        => 'qa-templates-v1.zip',
            'download_name' => 'qa-templates-v1.zip',
            'max_downloads' => 20,
        ],
    ];
}

function catalog_get(string $sku): ?array {
    $all = catalog_all();
    return $all[$sku] ?? null;
}
