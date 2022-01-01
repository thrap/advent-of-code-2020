fn main() {
    let input = include_str!("../input.txt")
        .lines()
        .map(|line| line.parse().unwrap())
        .collect::<Vec<u32>>();

    println!("{}", part1(&input));
    println!("{}", part2(&input));
}

fn part1(input: &Vec<u32>) -> u32 {
    for x in input.iter() {
        for y in input.iter() {
            if x + y == 2020 {
                return x * y
            }
        }
    }
    panic!()
}

fn part2(input: &Vec<u32>) -> u32 {
    for x in input.iter() {
        for y in input.iter() {
            for z in input.iter() {
                if x + y + z == 2020 {
                    return x * y * z
                }
            }
        }
    }
    panic!()
}
