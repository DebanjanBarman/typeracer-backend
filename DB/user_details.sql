--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2024-07-12 12:34:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16972)
-- Name: user_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_details (
    name character varying(50),
    id uuid NOT NULL,
    email character varying(100),
    password character varying(200),
    role character varying(5) DEFAULT 'user'::character varying,
    dob date DEFAULT '1900-01-01'::date,
    gender character varying(1) DEFAULT 'M'::character varying,
    img_url character varying(200) DEFAULT 'default.jpg'::character varying
);


ALTER TABLE public.user_details OWNER TO postgres;



--
-- TOC entry 3179 (class 2606 OID 16979)
-- Name: user_details user_details_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_email_key UNIQUE (email);


--
-- TOC entry 3181 (class 2606 OID 16977)
-- Name: user_details user_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_pkey PRIMARY KEY (id);


-- Completed on 2024-07-12 12:34:10

--
-- PostgreSQL database dump complete
--

