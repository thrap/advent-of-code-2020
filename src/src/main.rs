fn main() {
    let input = include_str!("../input.txt")
        .lines()
        .map(|line| line.parse().unwrap())
        .collect::<Vec<u32>>();

    println!("{}", part1(&input));
}

fn part1(input: &Vec<u32>) -> u32 {
    for x in input.iter() {
        for y in input.iter() {
            if x + y == 2020 {
                return x * y
            }
        }
    }
    0
}
