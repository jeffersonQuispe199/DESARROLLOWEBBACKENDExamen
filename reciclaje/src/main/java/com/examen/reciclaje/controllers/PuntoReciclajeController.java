package com.examen.reciclaje.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examen.reciclaje.entidades.PuntoReciclaje;
import com.examen.reciclaje.repositories.PuntoReciclajeRepository;

@RestController
@RequestMapping("/api/puntos")
@CrossOrigin(origins = "*") // Configuración de CORS requerida para el frontend local
public class PuntoReciclajeController {

    @Autowired
    private PuntoReciclajeRepository repository;

    @GetMapping
    public List<PuntoReciclaje> listarPuntos() {
        return repository.findAll();
    }

    @PostMapping
    public PuntoReciclaje guardarPunto(@RequestBody PuntoReciclaje punto) {
        return repository.save(punto);
    }
}