DROP DATABASE IF EXISTS LOCACAOFILME;
CREATE DATABASE LOCACAOFILME;
USE LOCACAOFILME;

CREATE TABLE GENERO (
    GEN_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    GEN_DESCRICAO VARCHAR(200)
);

CREATE TABLE DIRETOR (
    DIR_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    DIR_NOME VARCHAR(200)
);

CREATE TABLE ATOR (
    ATO_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    ATO_NOME VARCHAR(200),
    ATO_DATA_NASCIMENTO DATE
);

CREATE TABLE FILME (
    FIL_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    FIL_NOME VARCHAR(200),
    FIL_ANO_LANCAMENTO INTEGER,
    FIL_DURACAO INTEGER,
    FIL_SINOPSE VARCHAR(3000),
    FK_GENERO_GEN_ID INTEGER,
    FK_DIRETOR_DIR_ID INTEGER,
    FK_ATOR_ATO_ID INTEGER,
    FK_ATOR_ATO_COADJUVANTE_ID INTEGER,
    FOREIGN KEY (FK_GENERO_GEN_ID) REFERENCES GENERO (GEN_ID) ON DELETE RESTRICT,
    FOREIGN KEY (FK_DIRETOR_DIR_ID) REFERENCES DIRETOR (DIR_ID) ON DELETE RESTRICT,
    FOREIGN KEY (FK_ATOR_ATO_ID) REFERENCES ATOR (ATO_ID) ON DELETE RESTRICT,
    FOREIGN KEY (FK_ATOR_ATO_COADJUVANTE_ID) REFERENCES ATOR (ATO_ID) ON DELETE RESTRICT
);
