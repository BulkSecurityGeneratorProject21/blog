package eu.webdude.blog.service.mapper;

import eu.webdude.blog.domain.*;
import eu.webdude.blog.service.dto.PostDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Post and its DTO PostDTO.
 */
@Mapper(componentModel = "spring", uses = {AuthorMapper.class})
public interface PostMapper extends EntityMapper<PostDTO, Post> {

    @Mapping(source = "author.id", target = "authorId")
    PostDTO toDto(Post post); 

    @Mapping(source = "authorId", target = "author")
    Post toEntity(PostDTO postDTO);

    default Post fromId(Long id) {
        if (id == null) {
            return null;
        }
        Post post = new Post();
        post.setId(id);
        return post;
    }
}
