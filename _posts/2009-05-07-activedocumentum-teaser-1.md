---
layout: post
title: "ActiveDocumentum teaser #1"
---

Having stepped away from trying to get Documentum running on linux, I've been working on bringing the permissions through into our custom Lotus Notes/Documentum client. At the moment when a user imports a document to a given folder it does no permission checking before the fact, just errors nastily when it can't write the document. A short stop by <a href="http://askprasad.wordpress.com/documentum/some-useful-dql-tips/">Prasad's blog</a> gave me a query to start from.

<pre class="sql" name="code">SELECT i_all_users_names as users FROM dm_group
WHERE group_name IN (SELECT r_accessor_name FROM dm_acl
WHERE object_name IN (SELECT acl_name FROM dm_sysobject
                       WHERE r_object_id = '0c0xxxxx80009e16'))
ORDER BY i_all_users_names</pre>

This is superb, but it doesn't actually go far enough. If I was to attach it to my application and tell it not to let me import anything into the folder if my name wasn't on the list I wouldn't be able to copy anything into my home cabinet. It enumerates the members of any group within the ACL but doesn't deal with named users & also the owner.

This will give me a chance to show off what you can do with my ActiveDocumentum project. ActiveDocumentum is a working name for a JRuby gem written to provide functionality similar to what can be found in <a href="http://api.rubyonrails.org/files/vendor/rails/activerecord/README.html">ActiveRecord</a>, with the addition of repeating attributes and other DQL specific items. While the final code for the below function may end up being in Java or .Net. Doing it using ruby allowed me to very quickly scope out the logic of what would need to be done to get the permission that a user had on an object (NB: If there is a way to do this simply with DQL I'm not aware of it):

<pre name="code" class="ruby">
require 'config/environment'

def get_effective_permission(r_object_id, user = nil)
  return 0 if user.nil?
  folder = DmFolder.find(:first, :columns => "owner_name, owner_permit, acl_name", :conditions => {:r_object_id => r_object_id})
  current_level = 0
  if folder.owner_name.eql? user
    current_level = folder.owner_permit
  end
    acls = DmAcl.find(:all, :columns => "r_accessor_name, r_accessor_permit, r_is_group", :conditions => "object_name = '#{folder.acl_name}' ENABLE(ROW_BASED)")
    acls.each do |acl|
      if acl.r_accessor_name.eql? user
        current_level = acl.r_accessor_permit if acl.r_accessor_permit > current_level
      elsif acl.r_is_group.to_s.eql?('1') and not acl.r_accessor_permit.nil?
        group = DmGroup.find(:first, :columns => 'r_object_id, i_all_users_names', :conditions => {:group_name => acl.r_accessor_name})
        current_level = acl.r_accessor_permit if acl.r_accessor_permit > current_level and group.i_all_users_names.include?(user)
      end
    end
  end
  return current_level
end

r_object_id = '0c0xxxxx80009e16'

user = 'John Doe'

puts get_effective_permission(r_object_id, user)
</pre>

As you can see the above function takes a user and returns the highest permission that they have, by checking if they're either directly listed on the ACL or in one of the groups on the ACL. The bottom line is that with ActiveDocumentum I can write less lines of code for one off scripts that I have to create, and include complicated logic that is lacking in straight DQL scripts. I will be posting more details on this in the near future.
