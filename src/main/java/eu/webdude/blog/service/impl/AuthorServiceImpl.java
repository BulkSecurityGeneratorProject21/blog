package eu.webdude.blog.service.impl;

import eu.webdude.blog.service.AuthorService;
import eu.webdude.blog.domain.Author;
import eu.webdude.blog.repository.AuthorRepository;
import eu.webdude.blog.repository.search.AuthorSearchRepository;
import eu.webdude.blog.service.dto.AuthorDTO;
import eu.webdude.blog.service.mapper.AuthorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Author.
 */
@Service
@Transactional
public class AuthorServiceImpl implements AuthorService{

    private final Logger log = LoggerFactory.getLogger(AuthorServiceImpl.class);

    private final AuthorRepository authorRepository;

    private final AuthorMapper authorMapper;

    private final AuthorSearchRepository authorSearchRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository, AuthorMapper authorMapper, AuthorSearchRepository authorSearchRepository) {
        this.authorRepository = authorRepository;
        this.authorMapper = authorMapper;
        this.authorSearchRepository = authorSearchRepository;
    }

    /**
     * Save a author.
     *
     * @param authorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AuthorDTO save(AuthorDTO authorDTO) {
        log.debug("Request to save Author : {}", authorDTO);
        Author author = authorMapper.toEntity(authorDTO);
        author = authorRepository.save(author);
        AuthorDTO result = authorMapper.toDto(author);
        authorSearchRepository.save(author);
        return result;
    }

    /**
     *  Get all the authors.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AuthorDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Authors");
        return authorRepository.findAll(pageable)
            .map(authorMapper::toDto);
    }

    /**
     *  Get one author by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AuthorDTO findOne(Long id) {
        log.debug("Request to get Author : {}", id);
        Author author = authorRepository.findOne(id);
        return authorMapper.toDto(author);
    }

    /**
     *  Delete the  author by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Author : {}", id);
        authorRepository.delete(id);
        authorSearchRepository.delete(id);
    }

    /**
     * Search for the author corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AuthorDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Authors for query {}", query);
        Page<Author> result = authorSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(authorMapper::toDto);
    }
}
