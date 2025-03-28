package fr.marcof.enset_demo_spring_angular.service;

import fr.marcof.enset_demo_spring_angular.dto.NewPaymentDTO;
import fr.marcof.enset_demo_spring_angular.entities.Payment;
import fr.marcof.enset_demo_spring_angular.entities.PaymentStatus;
import fr.marcof.enset_demo_spring_angular.entities.PaymentType;
import fr.marcof.enset_demo_spring_angular.entities.Student;
import fr.marcof.enset_demo_spring_angular.repository.PaymentRepository;
import fr.marcof.enset_demo_spring_angular.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {
    private final StudentRepository studentRepository;
    private final PaymentRepository paymentRepository;

    public PaymentService(StudentRepository studentRepository, PaymentRepository paymentRepository){
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
    }

    public Payment savePayment(MultipartFile file, NewPaymentDTO newPaymentDTO)
            throws IOException {
        Path folderPath = Paths.get(System.getProperty("user.home"), "enset-data", "payments");
        if(!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }
        String fileName = UUID.randomUUID().toString();
        Path filePath = Paths.get(System.getProperty("user.home"), "enset-data", "payments", fileName+".pdf");
        Files.copy(file.getInputStream(), filePath);
        Student student = studentRepository.findByCode(newPaymentDTO.getStudentCode());
        Payment payment = Payment.builder()
                .date(newPaymentDTO.getDate())
                .type(newPaymentDTO.getType())
                .student(student)
                .amount(newPaymentDTO.getAmount())
                .file(filePath.toUri().toString()).status(PaymentStatus.CREATED)
                .build();
        return paymentRepository.save(payment);
    }

    public Payment updatePaymentStatus(PaymentStatus status, Long id)
    throws IOException{
        Payment payment = paymentRepository.findById(id).orElseThrow();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }

    public byte[] getPaymentFile(Long paymentId) throws IOException {
        Payment payment = paymentRepository.findById(paymentId).orElseThrow();
        if(payment.getFile() != null){
            return Files.readAllBytes(Path.of(URI.create(payment.getFile())));
        } else {
            return null;
        }
    }
}
