// 1. Initialize the terminal


const terminal = new Terminal({
    cursorBlink: true,
    theme: {
      background: '#1c1c1c',
      foreground: '#d4af37', // A gold-like color
      cursor: '#d4af37',
      black: '#000000',
      red: '#ff5555',
      green: '#50fa7b',
      yellow: '#f1fa8c',
      blue: '#bd93f9',
      magenta: '#ff79c6',
      cyan: '#8be9fd',
      white: '#bbbbbb',
      brightBlack: '#555555',
      brightRed: '#ff6e6e',
      brightGreen: '#69ff94',
      brightYellow: '#ffffa5',
      brightBlue: '#d6acff',
      brightMagenta: '#ff92df',
      brightCyan: '#a4ffff',
      brightWhite: '#ffffff'
    }
  });
  terminal.open(document.getElementById('terminal'));

  let asciiBanner = `PJMD\n
  Type 'help' for list of commands`;

  terminal.writeln(asciiBanner);
  
  showPrompt();
  // We'll store user input here
  let commandBuffer = '';

  // 4. Handle user input
  terminal.onKey(e => {
    const ev = e.domEvent;
    const key = e.key;
    const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
  
    if (ev.keyCode === 13) {
      // ENTER
      processCommand(commandBuffer.trim());
      commandBuffer = '';
    } else if (ev.keyCode === 8) {
      // BACKSPACE
      if (commandBuffer.length > 0) {
        commandBuffer = commandBuffer.slice(0, -1);
        terminal.write('\b \b');
      }
    } else if (printable) {
      commandBuffer += key;
      terminal.write(key);
    }
  });
  // 5. Command parser
  function processCommand(cmd) {
    switch (cmd.toLowerCase()) {
      case 'help':
        terminal.writeln('\r\nAvailable commands:');
        terminal.writeln(' whoami      Show Details about me');
        terminal.writeln(' linkedin    Show my Linkedin profike');
        terminal.writeln(' help        Show this help');
        terminal.writeln(' banner      Show the ASCII banner');
        terminal.writeln(' date        Show current date/time');
        terminal.writeln(' github      Show my GitHub link');
        terminal.writeln(' clear       Clear the screen');
        terminal.writeln(' exit        Exit the terminal (example action)');
        break;
  
      case 'whoami':
        terminal.writeln('');
        terminal.writeln('Pieter Johannes Muller Dannhauser (PJMD)\n')
        break;

      case 'banner':
        terminal.writeln('');
        terminal.writeln(asciiBanner.trim());
        break;
  
      case 'date':
        terminal.writeln('');
        terminal.writeln(`Current Date/Time: ${new Date().toLocaleString()}`);
        break;
  
      case 'github':
        terminal.writeln('');
        terminal.writeln('GitHub: https://github.com/MullerPietPompies');
        break;

      case 'linkedin':
        terminal.writeln('');
        terminal.writeln('Linkedin: https://www.linkedin.com/in/muller-dannhauser-02923424b/');
        break;

      case 'clear':
        terminal.clear();
        break;
  
      case 'exit':
        terminal.writeln('');
        terminal.writeln('Goodbye!');
        // Example: Disable further input or do something else
        // For now, just show the prompt again:
        break;
  
      default:
        if (cmd) {
          terminal.writeln(`\r\nUnknown command: ${cmd}`);
        }
    }
    showPrompt();
  }
  
  // 6. Show prompt
  function showPrompt() {
    terminal.write('\r\npjmd@term:~$ ');
  }
  