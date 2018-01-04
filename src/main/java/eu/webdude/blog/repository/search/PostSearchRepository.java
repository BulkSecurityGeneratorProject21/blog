package eu.webdude.blog.repository.search;

import eu.webdude.blog.domain.Post;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Post entity.
 */
public interface PostSearchRepository extends ElasticsearchRepository<Post, Long> {
}
