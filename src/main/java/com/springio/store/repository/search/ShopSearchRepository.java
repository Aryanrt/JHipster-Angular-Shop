package com.springio.store.repository.search;

import com.springio.store.domain.Shop;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Shop} entity.
 */
public interface ShopSearchRepository extends ElasticsearchRepository<Shop, Long> {
}
