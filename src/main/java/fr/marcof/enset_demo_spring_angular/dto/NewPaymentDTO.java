package fr.marcof.enset_demo_spring_angular.dto;

import fr.marcof.enset_demo_spring_angular.entities.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class NewPaymentDTO {
    private double amount;
    private PaymentType type;
    private String studentCode;
    private LocalDate date;


    //@RequestParam MultipartFile file, LocalDate date, double amount, PaymentType type, String studentCode
}
