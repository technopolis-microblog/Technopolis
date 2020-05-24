# -*- mode: ruby -*-
# vi: set ft=ruby :

$provision = <<SCRIPT
sudo pacman -Su --noconfirm
sudo pacman -S reflector
sudo reflector --verbose --latest 5 --sort rate --save /etc/pacman.d/mirrorlist

yes | sudo pacman -Syu
sudo pacman -S --noconfirm \
  base-devel \
  unzip \
  git \
  python2 \
  nodejs \
  rust

mkdir deno
cd ./deno
curl -o PKGBUILD 'https://aur.archlinux.org/cgit/aur.git/plain/PKGBUILD?h=deno'
yes | makepkg -i

deno install --allow-read --allow-run --unstable https://deno.land/x/drun@v1.1.0/drun.ts

echo 'export PATH="/home/vagrant/.deno/bin:$PATH"' >> ~/.bashrc
SCRIPT

Vagrant.configure("2") do |config|
  config.vm.box = 'archlinux/archlinux'
  
  config.vm.provider :virtualbox do |vb|
    vb.name = 'technopolis'
    vb.customize ['modifyvm', :id, '--memory', '4096']

    vb.customize ['modifyvm', :id, '--natdnsproxy1', 'off']
    vb.customize ['modifyvm', :id, '--natdnshostresolver1', 'off']

    vb.customize ['modifyvm', :id, '--nictype1', 'virtio']
    vb.customize ['modifyvm', :id, '--nictype2', 'virtio']
  end

  config.vm.network :forwarded_port, guest: 8080, host: 8080

  config.vm.provision :shell, inline: $provision, privileged: false
end
