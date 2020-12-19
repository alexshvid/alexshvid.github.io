---

feed:
  enable: true
  title: MacOs theme on Ubuntu (Keyboard)
  description: How to map MacOs shortcuts in Ubuntu
  image: /images/macos-keyboard.png
  date: 2020-12-16
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/macos-keyboard.png)

# How to map MacOs shortcuts in Ubuntu

I have amazing Apple keyboard that I am using at the same time in Ubuntu and MacOs.
Switching between shortcuts in two different OS is inconvenient, therefore I found a solution how to map MacOs keyboard to Ubuntu.

First step is to change Left Command (Left Super) mapping to Right Command.
Need to do following steps:
* Install Tweaks
* If it not starting make sure that `/usr/bin/gnome-tweaks` first like points to python3.6 instead of python3 (if you have python 3.7 like me)
* Go to `Keyboard & Mouse` -> Overview Shortcut change from `Left Super` to `Right Super`. It would remove layout overview to another key.
* Click `Additional Options` and change `Switching to another layout` to `Win+Space`. This would make keyboard language selection like in Mac OS.


### Global settings

Run application Settings
Open Settings -> keyboard 
Scroll to the block 'System'
Replace shortcuts:
* Show notification list -> Super+N
* Show the overview -> Super+O

### GTK-3.0

Change shortcut bindings for GTK-3.0, text edit fields, firefox and etc.
```
mkdir -p ~/.themes/macos/gtk-3.0/
cp /usr/share/themes/Emacs/gtk-3.0/gtk-keys.css ~/.themes/macos/gtk-3.0/
nano ~/.themes/macos/gtk-3.0/gtk-keys.css
```

Find the block
```
bind "<ctrl>w" { "cut-clipboard" () };
bind "<ctrl>y" { "paste-clipboard" () };
```

Insert after that
```
bind "<super>x" { "cut-clipboard" () };
bind "<super>v" { "paste-clipboard" () };
bind "<super>c" { "copy-clipboard" () };
```

Apply settings
```
gsettings set org.gnome.desktop.interface gtk-key-theme 'macos'
```

### Terminal
Open in Terminal -> Preferences -> Shortcuts

```
Edit.Copy   Super+C
Edit.Paste  Super+V
```

Or in command line
```
dconf write /org/gnome/terminal/legacy/keybindings/copy  \'"<Super>c"\'
dconf write /org/gnome/terminal/legacy/keybindings/paste \'"<Super>v"\'
```

### Atom editor
* Open Edit -> Preferences -> Keybindings
* Click `your keymap file`
* Paste

```
'body':
  'cmd-c': 'core:copy'
  'cmd-v': 'core:paste'
  'cmd-s': 'core:save'
  'cmd-z': 'core:undo'
  'cmd-y': 'core:redo'
```
