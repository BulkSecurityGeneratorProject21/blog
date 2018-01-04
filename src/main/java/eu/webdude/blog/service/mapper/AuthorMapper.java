package eu.webdude.blog.service.mapper;

import eu.webdude.blog.domain.*;
import eu.webdude.blog.service.dto.AuthorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Author and its DTO AuthorDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AuthorMapper extends EntityMapper<AuthorDTO, Author> {

    

    @Mapping(target = "posts", ignore = true)
    @Mapping(target = "comments", ignore = true)
    Author toEntity(AuthorDTO authorDTO);

    default Author fromId(Long id) {
        if (id == null) {
            return null;
        }
        Author author = new Author();
        author.setId(id);
        return author;
    }
}
