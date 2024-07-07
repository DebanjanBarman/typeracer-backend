--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2024-07-07 14:10:46

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
-- TOC entry 213 (class 1259 OID 17014)
-- Name: event_registrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_registrations (
    id uuid NOT NULL,
    user_id uuid,
    event_id uuid,
    team_name character varying(100),
    status character varying(50)
);


ALTER TABLE public.event_registrations OWNER TO postgres;

--
-- TOC entry 3317 (class 0 OID 17014)
-- Dependencies: 213
-- Data for Name: event_registrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event_registrations VALUES ('8c2b31e8-ec7b-47a0-91da-e8ca0ea61313', '1408b51a-bb84-4002-8da0-c33063c3d2cd', '58e8e20e-f157-4b0f-aec2-241b0a450823', 'ind', 'registered');
INSERT INTO public.event_registrations VALUES ('8ecb5ea0-07c9-46cf-b26b-4468a321edf8', '1408b51a-bb84-4002-8da0-c33063c3d2cd', 'bf9682c1-df78-418b-85c2-ece3d0c86947', 'Veilly', 'registered');


--
-- TOC entry 3175 (class 2606 OID 17018)
-- Name: event_registrations event_registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3177 (class 2606 OID 17024)
-- Name: event_registrations event_registrations_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.event_details(id);


--
-- TOC entry 3176 (class 2606 OID 17019)
-- Name: event_registrations event_registrations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_details(id);


-- Completed on 2024-07-07 14:10:47

--
-- PostgreSQL database dump complete
--

