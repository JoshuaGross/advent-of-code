extern crate clap;
use clap::{App, Arg};

fn main() {
    let matches = App::new("AOC Solution Runner")
        .version("1.0")
        .author("Joshua Gross <joshua.gross@gmail.com>")
        .about("Runs Advent of Code problem-solvers")
        .arg(
            Arg::with_name("year")
                .short("y")
                .long("year")
                .value_name("year")
                .help("AOC problem year")
                .takes_value(true),
        )
        .arg(
            Arg::with_name("day")
                .short("d")
                .long("day")
                .value_name("day")
                .help("AOC problem day")
                .takes_value(true),
        )
        .arg(
            Arg::with_name("part")
                .short("p")
                .long("part")
                .value_name("part")
                .help("AOC problem part (1 or 2)")
                .takes_value(true),
        )
        .arg(
            Arg::with_name("v")
                .short("v")
                .multiple(true)
                .help("Sets the level of verbosity"),
        )
        .get_matches();

    // Get params
    let year: i32 = matches
        .value_of("year")
        .unwrap_or("2021")
        .parse()
        .unwrap_or(2021);
    let day: i32 = matches.value_of("day").unwrap_or("1").parse().unwrap_or(1);
    let part: i32 = matches.value_of("part").unwrap_or("1").parse().unwrap_or(1);

    println!(
        "Running AOC solution finder: {} day {}, part {}",
        year, day, part
    );
}
