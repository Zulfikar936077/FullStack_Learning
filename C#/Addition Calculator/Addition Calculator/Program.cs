namespace Addition_Calculator
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Asking the user to input a whole number (e.g., Whole number: 1 or 2; not 1.5)
            Console.WriteLine("Enter the first whole number:");

            //Declaring the first and second whole numbers and assigning the initial values
            int myNum = 0;
            int myNum2 = 0;

            //Creatinga a string variable and storing the first inserted whole number by the user
            String userInput = Console.ReadLine(); 

            //Declaring the first insaerted whole number string and converting the inserted numerical string (not textual string) into an integer by parsing it
            myNum = int.Parse(userInput);

            //Asking the user to input another whole number (e.g., Whole number: 1 or 2; not 1.5)
            Console.WriteLine("Enter the second whole number:");

            //Stroing the second inserted whole number by the user in the same string variable (overwriting the previous value)
            userInput = Console.ReadLine();

            //Declaring the second insaerted whole number string and converting the inserted numerical string (not textual string) into an integer by parsing it
            myNum2 = int.Parse(userInput);

            //Showing the value on the screen
            Console.WriteLine("You have entered " + myNum);

            //Adding the two whole numbers
            int sum = myNum + myNum2;

            //String concatenation: Showing the result of the addition on the screen
            Console.WriteLine("The addition of " + myNum + " and " + myNum2 + " is :" + sum);


            //String Interpolation (Preferred approach instead of string concatenation): Showing the result of the addition on the screen
            Console.WriteLine($"The addition of { myNum }  and { myNum2 } is: { sum }");

            //Using the following line at the end so that the console appears on the screen until I press the ENTER key
            Console.ReadKey();
        }
    }
}

