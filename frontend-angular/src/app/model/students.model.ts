export interface Student{
    id: string,
    code: string,
    firstName: string,
    lastName: string,
    programId: string,
    photo: string
}

export interface Payment{
    id: number,
    date: Date,
    amount: number,
    type: PaymentType,
    status: string,
    file: string,
    student: Student,
}
export enum PaymentStatus{
    CREATED, VALIDATED, REJECTED
}

export enum PaymentType {
    CASH, CHECK, TRANSFER, DEPOSIT
    // CASH= 'Cash', CHECK= 'Check', TRANSFER='Transfert', DEPOSIT='Deposit'
}


// @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
// private Long id;
// private LocalDate date;
// private double amount;
// private PaymentType type;
// private PaymentStatus status;
// private String file;
// @ManyToOne
// private Student student;