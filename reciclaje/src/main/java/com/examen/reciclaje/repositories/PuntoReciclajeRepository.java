package com.examen.reciclaje.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.examen.reciclaje.entidades.PuntoReciclaje;

@Repository
public interface PuntoReciclajeRepository extends JpaRepository<PuntoReciclaje, Integer> {
}