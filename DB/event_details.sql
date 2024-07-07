--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2024-07-07 14:06:05

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
-- TOC entry 212 (class 1259 OID 17002)
-- Name: event_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_details (
    id uuid NOT NULL,
    name character varying(50),
    description character varying(100),
    date_from date,
    date_to date,
    location character varying(100),
    category character varying(20),
    status character varying(50)
);


ALTER TABLE public.event_details OWNER TO postgres;

--
-- TOC entry 3315 (class 0 OID 17002)
-- Dependencies: 212
-- Data for Name: event_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_details VALUES ('29c07780-4348-46bf-85c3-e096684a49b6', 'Adding', 'new Description', '2024-07-24', '2024-07-31', 'Navi Mumbai', 'Individual', 'Registrations Closed');
INSERT INTO public.event_details VALUES ('58e8e20e-f157-4b0f-aec2-241b0a450823', 'Kendrick Lamar', 'They Not Like Us', '2024-07-09', '2024-07-18', 'Compton', 'Individual', 'Registrations Open');
INSERT INTO public.event_details VALUES ('14a19863-681b-4774-8b10-022d89b8b61d', 'A', 'Checking', '2024-07-26', '2024-07-30', 'Checking', 'Individual', 'Registrations Open');
INSERT INTO public.event_details VALUES ('9531ab31-dcfb-4803-86e0-6e648cba5f30', 'Coding Battle ⚔️', 'Something so that it looks like it has a large description. ', '2024-07-01', '2024-07-05', 'New Delhi', 'Individual', 'Registrations Open');
INSERT INTO public.event_details VALUES ('bf9682c1-df78-418b-85c2-ece3d0c86947', 'new event', 'new ebent', '2024-07-09', '2024-08-07', 'Mumbai', 'Team', 'Registrations Open');


--
-- TOC entry 3175 (class 2606 OID 17006)
-- Name: event_details event_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_details
    ADD CONSTRAINT event_details_pkey PRIMARY KEY (id);


-- Completed on 2024-07-07 14:06:05

--
-- PostgreSQL database dump complete
--

