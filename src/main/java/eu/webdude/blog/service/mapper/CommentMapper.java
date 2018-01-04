package eu.webdude.blog.service.mapper;

import eu.webdude.blog.domain.*;
import eu.webdude.blog.service.dto.CommentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Comment and its DTO CommentDTO.
 */
@Mapper(componentModel = "spring", uses = {AuthorMapper.class})
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {

    @Mapping(source = "author.id", target = "authorId")
    CommentDTO toDto(Comment comment); 

    @Mapping(source = "authorId", target = "author")
    Comment toEntity(CommentDTO commentDTO);

    default Comment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comment comment = new Comment();
        comment.setId(id);
        return comment;
    }
}
