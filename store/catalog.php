<?php
/**
 * Product catalog. Prices are set here (inline price_data at checkout), so adding a
 * product = add an entry + drop the zip into store/files/. Keep SKUs stable.
 */

declare(strict_types=1);

function catalog_all(): array {
    return [
        'AOK-1' => [
            'name'        => 'Agent Ops Kit — the D.O.E. framework for Claude Code',
            'description' => 'Directive / Orchestration / Execution: the CLAUDE.md, directive templates, execution-script scaffolds, lint checks, and the self-annealing loop that keep AI coding agents reliable in production.',
            'price_cents' => 2900,
            'currency'    => 'usd',
            'file'        => 'agent-ops-kit-v1.zip',
            'download_name' => 'agent-ops-kit-v1.zip',
            'max_downloads' => 20,
        ],
    ];
}

function catalog_get(string $sku): ?array {
    $all = catalog_all();
    return $all[$sku] ?? null;
}
