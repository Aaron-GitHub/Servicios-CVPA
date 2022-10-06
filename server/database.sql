CREATE DATABASE srvicioscvpa;

CREATE SEQUENCE IF NOT EXISTS public.usuario_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE public.usuario_profesional (
   id BIGINT NOT NULL DEFAULT nextval('usuario_id_seq'::regclass),
   nombres VARCHAR(255),
   apellidos VARCHAR(255),
   run VARCHAR(255),
   email VARCHAR(255),
   contrasena VARCHAR(255),
   id_profesion BIGINT,
   activo BOOLEAN,
   administrador BOOLEAN,
   PRIMARY KEY (id)
);


CREATE SEQUENCE IF NOT EXISTS public.paciente_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE public.paciente (
   id BIGINT NOT NULL DEFAULT nextval('paciente_id_seq'::regclass),
   run VARCHAR(255),
   nombres VARCHAR(255),
   apellido_paterno VARCHAR(255),
   apellido_materno VARCHAR(255),
   fecha_nacimiento VARCHAR(255),
   fono VARCHAR(255),
   email VARCHAR(255),
   direccion VARCHAR(255),
   motivo_consulta VARCHAR(1000),
   id_profesional_evaulador BIGINT,
   PRIMARY KEY (id)
);


CREATE SEQUENCE IF NOT EXISTS public.profesion_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE public.profesion (
   id BIGINT NOT NULL DEFAULT nextval('profesion_id_seq'::regclass),
   nombre VARCHAR(255),
   activo BOOLEAN,
   PRIMARY KEY (id)
);


CREATE SEQUENCE IF NOT EXISTS public.calendarioVisitas_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE public.calendario_visitas (
   id BIGINT NOT NULL DEFAULT nextval('calendarioVisitas_id_seq'::regclass),
   fecha_hora TIMESTAMP WITHOUT TIME ZONE,
   id_paciente BIGINT,
   id_profesion BIGINT,
   comentario VARCHAR(1000),
   PRIMARY KEY (id)
);


CREATE SEQUENCE IF NOT EXISTS public.tratamiento_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE public.tratamiento (
   id BIGINT NOT NULL DEFAULT nextval('tratamiento_id_seq'::regclass),
   id_paciente BIGINT,
   id_profesional BIGINT,
   fecha TIMESTAMP WITHOUT TIME ZONE,
   comentario TEXT,
   objetivos TEXT,
   PRIMARY KEY (id)
);


CREATE SEQUENCE IF NOT EXISTS public.tarifas_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE public.tarifas (
   id BIGINT NOT NULL DEFAULT nextval('tarifas_id_seq'::regclass),
   id_profesion BIGINT,
   tarifa NUMERIC(16,2),
   PRIMARY KEY (id)
);


ALTER TABLE usuario_profesional ADD CONSTRAINT "FK_decf2ec3-1b12-418b-8398-cdc9110254ea" FOREIGN KEY (id_profesion) REFERENCES profesion(id)  ;

ALTER TABLE paciente ADD CONSTRAINT "FK_db6946b3-f9d7-4eaf-b333-bd877b4d3387" FOREIGN KEY (id_profesional_evaulador) REFERENCES usuario_profesional(id)  ;

ALTER TABLE calendario_visitas ADD CONSTRAINT "FK_92839e55-b708-4f8e-992d-2a98528bc937" FOREIGN KEY (id_paciente) REFERENCES paciente(id)  ;

ALTER TABLE calendario_visitas ADD CONSTRAINT "FK_9735efa6-d074-49e3-85de-c69ba876108f" FOREIGN KEY (id_profesion) REFERENCES profesion(id)  ;

ALTER TABLE tratamiento ADD CONSTRAINT "FK_eb65140e-27f4-4557-894a-c9ebd645e0fe" FOREIGN KEY (id_paciente) REFERENCES paciente(id)  ;

ALTER TABLE tratamiento ADD CONSTRAINT "FK_8e90473a-454f-4c83-abc8-02cb6590bff7" FOREIGN KEY (id_profesional) REFERENCES usuario_profesional(id)  ;

ALTER TABLE tarifas ADD CONSTRAINT "FK_6ddb3fc8-fe4f-44bf-8333-7412c3feec1b" FOREIGN KEY (id_profesion) REFERENCES profesion(id)  ;