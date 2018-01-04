package eu.webdude.blog.repository.search;

import eu.webdude.blog.domain.Author;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Author entity.
 */
public interface AuthorSearchRepository extends ElasticsearchRepository<Author, Long> {
}
