Summary: Opendesktop.org App
Name: opendesktop-app
Version: 0.1.0
Release: 1%{?dist}
License: GPLv3+
Group: Applications/Internet
URL: https://github.com/opendesktop/opendesktop-app

#Source0: https://github.com/opendesktop/opendesktop-app/archive/release-%{version}.tar.gz
Source0: %{name}.tar.gz

Requires: libQt5Svg5 >= 5.2.0, libqt5-qtquickcontrols >= 5.2.0
BuildRequires: make, automake, gcc, gcc-c++, libtool, libqt5-qtbase-devel >= 5.2.0, libqt5-qtsvg-devel >= 5.2.0, libqt5-qtdeclarative-devel >= 5.2.0, git, nodejs, npm, rpm-build

%description
An opendesktop.org application.

%prep
#%%autosetup -n %{name}-release-%{version}
%autosetup -n %{name}

%build
%define debug_package %{nil}
make

%install
make DESTDIR="%{buildroot}" prefix="/usr" install

%files
%defattr(-,root,root)
%{_bindir}/%{name}
/usr/lib/%{name}-*/*
%{_datadir}/applications/%{name}.desktop
%{_datadir}/icons/hicolor/scalable/apps/%{name}.svg

%clean
rm -rf %{buildroot}

%changelog
* Wed Apr 19 2017 Akira Ohgaki <akiraohgaki@gmail.com> - 0.1.0-1
- Initial release
