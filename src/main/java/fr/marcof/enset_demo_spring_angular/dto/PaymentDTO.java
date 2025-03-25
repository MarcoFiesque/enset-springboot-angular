package fr.marcof.enset_demo_spring_angular.dto;

import fr.marcof.enset_demo_spring_angular.entities.PaymentStatus;
import fr.marcof.enset_demo_spring_angular.entities.PaymentType;
import fr.marcof.enset_demo_spring_angular.entities.Student;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter @ToString @Builder
public class PaymentDTO {
    private Long id;
    private LocalDate date;
    private double amount;
    private PaymentType type;
    private PaymentStatus status;
}
