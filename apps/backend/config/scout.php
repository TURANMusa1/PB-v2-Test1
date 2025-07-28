<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Search Engine
    |--------------------------------------------------------------------------
    |
    | This option controls the default search connection that gets used while
    | using Laravel Scout. This connection is used when syncing all models
    | to the search service. You should adjust this based on your needs.
    |
    | Supported: "algolia", "meilisearch", "database", "collection", "null"
    |
    */

    'driver' => env('SCOUT_DRIVER', 'database'),

    /*
    |--------------------------------------------------------------------------
    | Index Prefix
    |--------------------------------------------------------------------------
    |
    | Here you may specify a prefix that will be applied to all search index
    | names used by Scout. This prefix may be useful if you have multiple
    | "tenants" or applications, and you need to separate their search data.
    |
    */

    'prefix' => env('SCOUT_PREFIX', ''),

    /*
    |--------------------------------------------------------------------------
    | Queue Data Syncing
    |--------------------------------------------------------------------------
    |
    | This option allows you to control if the operations that sync your data
    | with your search engines are queued. When this is set to "true" then
    | all automatic data syncing will get queued for better performance.
    |
    */

    'queue' => env('SCOUT_QUEUE', false),

    /*
    |--------------------------------------------------------------------------
    | Database Transactions
    |--------------------------------------------------------------------------
    |
    | Indicates if the database transactions should be used when syncing your
    | data to your search engines. This option can be useful to disable if
    | you are running Scout in a queue worker where transactions are not
    | available or desired.
    |
    */

    'after_commit' => false,

    /*
    |--------------------------------------------------------------------------
    | Chunk Sizes
    |--------------------------------------------------------------------------
    |
    | When updating your search index, you can specify the number of models
    | that should be processed in each chunk. This can be useful if you
    | have a large number of models and want to control memory usage.
    |
    */

    'chunk' => [
        'searchable' => 500,
        'unsearchable' => 500,
    ],

    /*
    |--------------------------------------------------------------------------
    | Soft Deletes
    |--------------------------------------------------------------------------
    |
    | If you are using soft deletes on your models, you can control whether
    | Scout will sync your soft deleted models to your search index. By
    | default, soft deletes are ignored by the search index. You can
    | control this behavior by setting this option to "true".
    |
    */

    'soft_delete' => false,

    /*
    |--------------------------------------------------------------------------
    | Identify
    |--------------------------------------------------------------------------
    |
    | If you are using Meilisearch, you can configure the identify option to
    | add a unique identifier to your search index. This can be useful if
    | you have multiple applications using the same Meilisearch instance.
    |
    */

    'identify' => env('SCOUT_IDENTIFY', false),

    /*
    |--------------------------------------------------------------------------
    | Algolia
    |--------------------------------------------------------------------------
    |
    | Here you can configure your Algolia settings. An application ID and
    | admin API key are required to use Algolia. You can sign up for a
    | free account at https://www.algolia.com/.
    |
    | You can also configure the search API key for use in your frontend
    | application. The search API key has limited permissions and is safe
    | to use in your frontend application.
    |
    */

    'algolia' => [
        'id' => env('ALGOLIA_APP_ID', ''),
        'secret' => env('ALGOLIA_SECRET', ''),
        'search_key' => env('ALGOLIA_SEARCH', ''),
    ],

    /*
    |--------------------------------------------------------------------------
    | Meilisearch
    |--------------------------------------------------------------------------
    |
    | Here you can configure your Meilisearch settings. An application host
    | and API key are required to use Meilisearch. You can sign up for a
    | free account at https://www.meilisearch.com/.
    |
    */

    'meilisearch' => [
        'host' => env('MEILISEARCH_HOST', 'http://localhost:7700'),
        'key' => env('MEILISEARCH_KEY', null),
        'index-settings' => [
            \App\Models\Candidate::class => [
                'filterableAttributes' => ['status', 'position_applied', 'current_company'],
                'sortableAttributes' => ['created_at', 'first_name', 'last_name'],
                'searchableAttributes' => ['first_name', 'last_name', 'email', 'position_applied', 'current_company'],
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Database Engine
    |--------------------------------------------------------------------------
    |
    | Here you can configure your database search engine. This engine is
    | useful for local development and testing. You can configure the
    | searchable data and the name of the index table.
    |
    */

    'database' => [
        'table' => 'scout_index',
        'connection' => null,
    ],

    /*
    |--------------------------------------------------------------------------
    | Collection Engine
    |--------------------------------------------------------------------------
    |
    | Here you can configure your collection search engine. This engine is
    | useful for local development and testing. You can configure the
    | searchable data and the name of the index table.
    |
    */

    'collection' => [
        'table' => 'scout_index',
        'connection' => null,
    ],

];
