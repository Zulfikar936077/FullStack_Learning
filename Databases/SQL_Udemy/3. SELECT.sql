CREATE TABLE #EmployeesDemo (
	EmployeeID INT PRIMARY KEY,
	FirstName VARCHAR(50),
	LastName VARCHAR(50),
	BirthDate DATE,
	Phone VARCHAR(20)
);

INSERT INTO #EmployeesDemo (EmployeeID, FirstName, LastName, BirthDate, Phone)
VALUES (1, 'John', 'Doe', '1980-01-01', '555-1234'),
	   (2, 'Jane', 'Smith', '1990-02-15', '555-5678'),
	   (3, 'Michael', 'Johnson', '1985-03-20', '555-9012'),
	   (4, 'Emily', 'Davis', '1995-04-10', '555-3456'),
	   (5, 'David', 'Wilson', '1988-05-25', '555-7890');

SELECT * FROM #EmployeesDemo;

SELECT FirstName, LastName FROM #EmployeesDemo;

SELECT FirstName, EmployeeID FROM #EmployeesDemo;