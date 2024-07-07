--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2024-07-07 14:11:20

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
    role character varying(5) DEFAULT 'user'::character varying
);


ALTER TABLE public.user_details OWNER TO postgres;

--
-- TOC entry 3318 (class 0 OID 16972)
-- Dependencies: 209
-- Data for Name: user_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_details VALUES ('sourab', '413e4bff-c5a3-4fcf-a1ec-993d4bce431f', 'sourab@xmail.com', '$2b$12$Y0EYBxNKh.z/RyO/m9MS5uNzUiKdPlBS72Eqpu9RnWspwCi5u5pyS', 'user');
INSERT INTO public.user_details VALUES ('Sourab', '270cd1fa-5078-45a5-a7db-7f19c52f7221', 'sourab@zmail.com', '$2b$12$8gWqhZ.yqeljMjqTqScN3.0EHyqeMFnrbRpe3072G.ojP2N5zqr7.', 'user');
INSERT INTO public.user_details VALUES ('sourabnew', 'eee105b7-4ab6-47d5-9455-c4e4cb9144cf', 'sourab@new.com', '$2b$12$utbSpO0EYf8YUjyOXMOvD.OIJVqAmxlnBDg81WniQFmmjS/SF9N4u', 'user');
INSERT INTO public.user_details VALUES ('sourabnew', 'f20a62cc-2a4b-475e-9813-9c9ee881056c', 'sourab@newnew.com', '$2b$12$BoNEnYdC1YwabSPKV1p.YeCJTIoRFx.s4rCUtYGZD91uZsLRd3jg2', 'user');
INSERT INTO public.user_details VALUES ('username', 'b14d4cd8-0a5f-4cdc-ad32-b40d7c4b7882', 'email@email.com', '$2b$12$3yiBGB/A7uY/oVEGmpm.mez0yJOwF1DlYHAsvkxmzGwxCRTrbdSSi', 'user');
INSERT INTO public.user_details VALUES ('sourab', '1408b51a-bb84-4002-8da0-c33063c3d2cd', 'sourab@email.com', '$2b$12$wx6Im05wuweRG3jEd5n7pug/PqO5sEQZDjMZj0c.6sEENly.r3QJ2', 'admin');


--
-- TOC entry 3176 (class 2606 OID 16979)
-- Name: user_details user_details_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_email_key UNIQUE (email);


--
-- TOC entry 3178 (class 2606 OID 16977)
-- Name: user_details user_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_pkey PRIMARY KEY (id);


-- Completed on 2024-07-07 14:11:20

--
-- PostgreSQL database dump complete
--

