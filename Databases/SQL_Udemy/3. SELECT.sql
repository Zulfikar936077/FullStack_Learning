INSERT INTO dbo.Employees (EmployeeID, FirstName, LastName, BirthDate, Phone)
VALUES (1, 'John', 'Doe', '1980-01-01', '555-1234'),
	   (2, 'Jane', 'Smith', '1990-02-15', '555-5678'),
	   (3, 'Michael', 'Johnson', '1985-03-20', '555-9012'),
	   (4, 'Emily', 'Davis', '1995-04-10', '555-3456'),
	   (5, 'David', 'Wilson', '1988-05-25', '555-7890');

SELECT * FROM Employees;

SELECT FirstName, LastName FROM Employees;

SELECT FirstName, EmployeeID FROM Employees;