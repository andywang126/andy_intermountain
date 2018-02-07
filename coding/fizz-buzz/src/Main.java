public class Main {

    public static void main(String[] args) {
        for (int i =1; i<=100; i++)
            System.out.println(fizzBuzz(i));
    }

    //return "Fizz" if i%3 = 0, "Buzz" if i%5=0, "Fizz Buzz" if i%3=0 and i%5=0, else return i
    public static String fizzBuzz(int i) {
        if (i % 3 == 0 && i % 5 == 0) {
            return "Fizz Buzz";
        }
        else if (i % 3 == 0)
            return "Fizz";
        else if (i % 5 == 0)
            return "Buzz";
        else return String.valueOf(i);
    }
}